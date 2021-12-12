import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import LibFlash from '../../lib/LibFlash'
//import Config from '../../../config'
import axios from '~/lib/axios';

export let meta: MetaFunction = () => {
  return {
    title: "Task Create",
    description: "Welcome to remix!"
  };
};

export default function Page() {
//console.log(cfg.OK_CODE);
  /*
  const cfg = Config.getConfig();
  let data = useActionData();
  if(typeof data !== 'undefined'){
    console.log("result=", data.result);
    if(cfg.OK_CODE === data.result){
      alert("OK, save");
      location.href = "/tasks";
    }
  }
  */
  let onClick = async function(){
    console.log("#onClick");
    const title = document.querySelector<HTMLInputElement>('#title');
    const item = {
      title: title.value,
      content: "",
    }
    const res = await axios.post(
      '/api/tasks/create', item 
    );
console.log(res);
    LibFlash.setMessage("OK, Save");
    alert("OK, Save");
    location.href = "/tasks";
  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>Task - Create</h2>
        <hr />
        <label>
          <div>Title:</div>
          <input type="text" className="form-control" name="title" id="title" />
        </label>
        <hr />
        <button onClick={() => onClick()} className="btn btn-primary">Save
        </button>
        {/*
        */}
      </main>
    </div>
  );
}
