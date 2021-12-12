/* hook test */
import { useEffect, useRef, useState } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import LibTest from '../../lib/LibTest'

export let meta: MetaFunction = () => {
  return {
    title: "test9",
    description: "Welcome to remix!"
  };
};

export default function Page() {
  let key = process.env.key_message_success;
console.log(key);
  const [items, setItems] = useState([]);
  const onClick = async function(){
//    alert("onClick");
    loadItems();
  }
  const loadItems = async function(){
    try{
    } catch (e) {
      console.error(e);
    }
  }
  loadItems();
  return (
    <div className="remix__page">
      <main>
        <h2>Welcome , Test9-11</h2>
        <hr />
        <button onClick={() => onClick()}>Test</button>
        <hr />
        <ul>
        {items.map(item => (
          <li key={item.id} className="remix__page__resource">
            {item.title}
          </li>
        ))}
        </ul>
      </main>
    </div>
  );
}
