import React, { useEffect } from "react";
import { useState } from "react";
import { axiosInstance,  PROJECT_URL } from "../../../../services/EndPoints";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { toast } from "react-toastify";


interface projectData {
  title:string;
  description: string;
  task:object[];
  id:number;
} 

export default function ProjectLists() {
  const [projectsList, setProjectsList] = useState([]);
  const [titleValue , setTitleValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id:number) => {
    setSelectedId(id);
    setShow(true)};

    const getTitleValue = (input:any) => {
      setTitleValue(input.target.value);
      getAllProjects(input.target.value)
     }

  let getAllProjects = async(title?:string, pageNo?:string ,pageSize?:number) => {
    try {
      
      let response = await axiosInstance.get(PROJECT_URL.GIT_PROJECTS_FOR_MANAGER,{params:{pageSize: pageSize,pageNumber:pageNo,title:title}});
      console.log(response?.data);
      setProjectsList(response?.data.data);
      setArrayOfPages(Array<string>(response.data.totalNumberOfPages).fill().map((_,i) => i+1))
    } catch (error) {
     console.log(error)
    }
   };

   let deleteProject = () => {
    try {
      let response = axiosInstance.delete(PROJECT_URL.DELETE_PROJECT(selectedId)
      );
      toast?.success('Item deleted successfuly');
      getAllProjects();
    } catch (error) {

      console.log(error);
      toast?.error(error.response.data.message);
    }
    
    handleClose()
  }

   useEffect(() => {
    getAllProjects();
    
  }, []);

  return (
    
    <>
   
    <div className=' d-flex justify-content-between p-4'>
      <h3>Projects</h3>
      <button className=' btn-add' >+ Add New Poject</button>
    </div>
    <div className='p-4'>
    {/* {projectsList.length > 0 ? (  */}
    <div className="row mb-4" >
        <div className="col-md-4">
          <input type='text' placeholder='search by title ...' className='form-control' onChange={getTitleValue}/>
        </div>
      </div>
    <table className=" ">
    <thead >
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">No Of Tasks</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {projectsList.map((project:projectData) => 
        <tr key={project.id}>
        <td>{project.title}</td>
        <td>{project.description}</td>
        <td>{project.task.length}</td>
        <td className='cred-icons'>
        <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
      <i className="fa-solid fa-ellipsis-vertical"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
        <button onClick={()=> handleShow(project.id)}><i className="fa-solid fa-trash mx-3 " ></i></button>
         
         <span>delete</span>
         </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
        <i className="fa-regular fa-pen-to-square mx-3 " ></i>
        <span>edit</span>
        </Dropdown.Item>
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
    
        </td>
      </tr>
      )}
      
    </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
          {/* <img src={noData} alt=''/> */}
          <h5 className='my-3'>Delete This Project ?</h5>
          <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          
          <Button className='delete-btn' variant="primary" onClick={deleteProject}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
         
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayOfPages.map((pageNo) =>(<li key={pageNo} onClick={() => getAllProjects(pageNo, 5)}
     className="page-item"><a className="page-link" href="#">{pageNo}</a></li>))}
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
       {/* ) 
       : <h1>no data</h1> } */}
    
    </div>
    
   
    
    </>
  )
}
