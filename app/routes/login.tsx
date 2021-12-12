import { useEffect, useRef, useState } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import { useLoaderData, Link } from "remix";
import Config from '../../config'
import LibCookie from '../lib/LibCookie'
import axios from '~/lib/axios';
//const { PrismaClient } = require('@prisma/client');

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

export async function action({ request }) {
  return json({ result: 'OK' })
}
export default function Page() {
  let data = useActionData();
  //state
  const [message, setMessage] = useState("");
//console.log(data);
  const onClick = async function(){
    try{
      console.log("#onClick");
      const key = Config.COOKIE_KEY_USER_ID;
      const mail = document.querySelector<HTMLInputElement>('#mail');
      const password = document.querySelector<HTMLInputElement>('#password');
      const item = {
        email: mail.value,
        password: password.value,
      }
  console.log( item )
      const res = await axios.post(
        '/api/users/login', item 
      )
  console.log( res.data )
      if( res.data.ret !== 1){
        throw new Error('Error , login');
      }
      const user_id = res.data.user_id;
console.log("user_id=", user_id);
      LibCookie.set_cookie(key, user_id);
      alert("OK, Login");
      location.href="/"    
    } catch (e) {
      console.error(e);
      alert("Error, Login");
    }    
  }
  return (
    <div className="remix__page">
      <main>
        <h2>Login</h2>
        <p>{message}</p>
        <hr />
        <Form method="post" name="form1" className="remix__form">
          <div className="col-sm-6">
            <label>
              <div>mail:</div>
              <input type="text" name="mail" id="mail" className="form-control" />
            </label>
          </div>
          <div className="col-sm-6">
            <label>
              <div>password:</div>
              <input type="password" name="password" id="password" className="form-control" />
            </label>
          </div>
        </Form>        
        <button className="mt-2 btn btn-primary" onClick={() => onClick()}>Login
        </button>
        <hr />
        <Link to="/users/create">
          <button className="mt-2 btn btn-outline-primary">Register</button>
        </Link>
        {/*
          <div>
            <button type="submit">Submit</button>
          </div>
        */}
      </main>
    </div>
  );
}
