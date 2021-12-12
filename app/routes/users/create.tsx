import { useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import Config from '../../../config'
import axios from '~/lib/axios';

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export async function action({ request }) {
  console.log({});
  return json({ result: 'OK' })
}

export default function Page() {
  const initCreate = async function(){
    const res = await axios.get('/api/users/count'); 
    const count = res.data.count;
console.log(count);  
    if(count > 0){
      alert("Error, user max  1");
      location.href = "/login";
    }
  }
  useEffect( () => {
    initCreate();
  },[])
  const onClick = async function(){
    try{
      const mail = document.querySelector<HTMLInputElement>('#mail');
      const name = document.querySelector<HTMLInputElement>('#name');
      const password = document.querySelector<HTMLInputElement>('#password');
      const item = {
        name: name.value,
        email: mail.value,
        password: password.value,
      }
  console.log( item )
      const res = await axios.post(
        '/api/users/add', item 
      )
  console.log( res.data )
      if( parseInt(res.data.ret) !== 1){
        throw new Error('Error , add user');
      }
      alert("OK, add")
      location.href="/"
    } catch (e) {
      console.error(e);
      alert("Error, save item")
    }

  }
  
  return (
    <div className="remix__page">
      <main>
        <h2>User - Create</h2>
        <hr />
        <Form method="post" name="form1" className="remix__form">
          <div className="col-sm-6">
            <label>
              <div>Mail:</div>
              <input type="text" name="mail" id="mail" className="form-control" />
            </label>
          </div>
          <div className="col-sm-6">
            <label>
              <div>name:</div>
              <input type="text" name="name" id="name" className="form-control" />
            </label>
          </div>
          <div className="col-sm-6">
            <label>
              <div>password:</div>
              <input type="password" name="password" id="password" className="form-control" />
            </label>        
          </div>
        </Form>        
        <hr />
        <button onClick={() => onClick()}>Save
        </button>
        {/*
          <div>
            <button type="submit">Submit</button>
          </div>
        */}
      </main>
    </div>
  );
}
