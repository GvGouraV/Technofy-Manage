import React , {Component} from "react";
import http from "../services/http.Script";
import queryString from "query-string";
class AllStudent extends Component{
   
    state={
        data:[],
        optionArr:["ANGULAR","JAVASCRIPT","REACT","BOOTSTRAP","CSS","REST AND MICROSERVICES","NODE"],

    }
  
   
    async fetchData(){
       let {pathname} = this.props.location
       console.log(pathname)
        let queryParams = queryString.parse(this.props.location.search);
        queryParams.page=queryParams.page==undefined?1:queryParams.page
        let searchStr =this.makeSearchString(queryParams)
        let response=null
        if(pathname=="/allStudent")
           response = await http.get(`/getStudents?${searchStr}`);
        else 
           response = await http.get(`/getFaculties?${searchStr}`);
        let { data } = response;
        console.log(data)
        this.setState({data:data})
    }
    componentDidMount() {
      this.fetchData();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) this.fetchData();
    }
    callURl = (url, options) => {
      let searchString = this.makeSearchString(options);
      this.props.history.push({
        pathname: url,
        search: searchString,
      });
    };
    makeSearchString = (options) => {
      let { page,course } = options;
      let searchStr = "";
      searchStr = this.addToQueryString(searchStr, "page", page);
      searchStr = this.addToQueryString(searchStr, "course", course);
      return searchStr;
    };
    addToQueryString = (str, parmName, paramValue) =>
      paramValue
        ? str
          ? `${str}&${parmName}=${paramValue}`
          : `${parmName}=${paramValue}`
        : str;
   
   showCheckBox=(Arr,value)=>{
       return(  <div className="container ">
       <h4 className="border text-center mt-5" style={{height:"40px"}}>Options</h4>
       {Arr.map((crc)=>(
     <div className="border">
         <div className="form-check mx-5">
         <input
         className="form-check-input"
         type="checkbox"
         name="course"
         value={crc}
         checked={value.find((val)=>val===crc)}
         onChange={this.handleChange}
         />
         <label className="form-check-label">{crc}</label></div><br/>
     </div>
       ))}</div>)
   }
  
    handleChange = (e) =>{
        let {pathname} = this.props.location
         let {currentTarget:input} = e;
         let queryParams = queryString.parse(this.props.location.search);
         queryParams.course=(this.updateCBs(queryParams.course,input.checked,input.value))
         this.callURl(`${pathname}`,queryParams)
     }
      updateCBs = (inpValue, checked , value)=>{
          let inpArr = inpValue ? inpValue.split(",") : [];
          if(checked){
              inpArr.push(value)
          }else{
              let index = inpArr.findIndex((ele) => ele===value);
              if(index >=0) inpArr.splice(index,1);
          }
          return inpArr.join(",");
      }
        addPage = () =>{
            let {pathname} = this.props.location
            let queryParams = queryString.parse(this.props.location.search);
            queryParams.page=queryParams.page==undefined?1:queryParams.page
            queryParams.page=+queryParams.page
            queryParams.page++
            console.log(queryParams)
            this.callURl(`${pathname}`,queryParams)   
        }
        subPage = () =>{
            let {pathname} = this.props.location
            let queryParams = queryString.parse(this.props.location.search);
            queryParams.page=queryParams.page==undefined?1:queryParams.page
            queryParams.page=+queryParams.page
            queryParams.page--
            this.callURl(`${pathname}`,queryParams)
        }
    render(){
        let {pathname} = this.props.location
        console.log(pathname)
        let queryParams = queryString.parse(this.props.location.search);
   let {items=[],page,totalItems,totalNum} = this.state.data
   let {optionArr} = this.state
     let count=0
        return(
      <div className="container">
           <div className="row">
               <div className="col-3">
                {this.showCheckBox(optionArr,queryParams.course=[])}
               </div>
               <div className="col-9">
                   <h2>{pathname=="/allStudent"?"All Student":"All Facuilty"}</h2>
                   <h6>{page} - {totalItems} of {totalNum}</h6>
                   <div className="row bg-dark text-light">
                       <div className={pathname=="/allStudent"?"col-2":"col-4"}>Id</div>
                       <div className={pathname=="/allStudent"?"col-2":"col-4"}>Name</div>
                       {pathname=="/allStudent"
                       ?  <div className="col-3">Date-of-Birth</div>
                       :""
                       }
                       {pathname=="/allStudent"
                       ?   <div className="col-2">About</div>
                       :""
                       }
                       <div className={pathname=="/allStudent"?"col-2":"col-4"}>Courses</div>
                   </div>
                   {items.map(p=>{count++})}
                   {items.map(op=>(                       
                        <div className="row bg-warning border">
                        <div className={pathname=="/allStudent"?"col-2":"col-4"}>{op.id}</div>
                        <div className={pathname=="/allStudent"?"col-2":"col-4"}>{op.name}</div>
                        {pathname=="/allStudent"
                       ?   <div className="col-3">{op.dob}</div>
                       :""
                       }
                        {pathname=="/allStudent"
                       ?   <div className="col-2">{op.about}</div>
                       :""
                       }
                    
                        <div className={pathname=="/allStudent"?"col-3":"col-4"}>{op.courses.map(p=><span>{p} ,</span>)}</div>
                    </div>
                   ))}<br/>
                   <div className="row">
                    <div className="col-2">{page<=1?"":<button className="btn btn-primary" onClick={()=>this.subPage()}>Prev</button>}</div>
                   <div className="col-8"></div>
                    <div className="col-2">{count<3?"":<button className="btn btn-primary" onClick={()=>this.addPage()}>Next</button>}</div>
                   </div>
               </div>
           </div>
      </div>)
    }
}
export default AllStudent;