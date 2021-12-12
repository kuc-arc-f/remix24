import { useCatch, Link, json, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import React, {useState, useEffect, useRef} from 'react';
import LibFlash from '../../../lib/LibFlash';
import axios from '~/lib/axios';

export let loader: LoaderFunction = async ({ params }) => {
  if (params.id === "this-record-does-not-exist") {
    throw new Response("Not Found", { status: 404 });
  }
  if (params.id === "shh-its-a-secret") {
    throw json({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }
  return { param: params.id };
};

export default function TaskEdit() {
  let data = useLoaderData();
  const param = data.param;
  console.log(param);
  // state
//  const [task, setTask] = useState([]);
  const [title, setTitle] = useState("");
  const initTask = async function(){
    try{
      const res = await axios.get('/api/tasks/show?id=' + param); 
      console.log(res.data);  
        const item = res.data; 
//console.log(item);
      setTitle(item.title);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    initTask();
  },[]);
  //let item: any = task;
  let onClick = async function(){
    console.log("#onClick");
    const title = document.querySelector<HTMLInputElement>('#title');
console.log("title=", title.value);
    const item = {
      id: param,
      title: title.value,
      content: "",
    }
    const res = await axios.post(
      '/api/tasks/update', item 
    )
console.log( res.data )

    LibFlash.setMessage("OK, Save");
    alert("OK, Save");
    location.href = "/tasks";
  }
  let clickDelete = async function(){
console.log("#clickDelete");
    const item = {
      id: param,
    }
    const res = await axios.post(
      '/api/tasks/delete', item 
    )
    console.log( res.data );
    LibFlash.setMessage("OK, delete");
    alert("OK, delete"); 
    location.href = "/tasks";   
  }  
  return (
    <div className="remix__page">
      <h3>Tasks - Edit</h3>
      <hr />
      <label>
        <div>Title:</div>
        <input name="title" id="title" type="text" className="form-control"
         defaultValue={title} />
      </label>      
      <hr />
      <button onClick={() => onClick()} className="btn btn-primary">Save
      </button>
      <hr />
      <button onClick={() =>clickDelete()} className="btn btn-danger">Delete
      </button>      
      <hr />
      <p>ID: {}</p>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>ErrorBoundary: {error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops...",
  };
};
