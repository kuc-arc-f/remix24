
import { useEffect, useRef, useState } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Form, json, useActionData, redirect } from "remix";
import axios from '~/lib/axios'

export let meta: MetaFunction = () => {
  return {
    title: "test",
    description: "Welcome to remix!"
  };
};

export default function TestFile() {
  console.log("#TestFile");
//  const [items, setItems] = useState([]);
  const upload = function(){
    var params = new FormData();
    const files = document.querySelector<HTMLInputElement>('#file1').files;
    const fileObject = files[0]; 
    if (typeof fileObject === "undefined") {
      console.error("none, fileObject");
      return;
    }
    params.append('file1', fileObject);
    axios.post("/api/file/upload", params).then(function(res) {
      // 成功時
      console.log(res.data);
      console.log("OK, file");
    })
    .catch(function(error) {
      // エラー時
      console.error(error);
    });
  }
  useEffect(() => {
    document.getElementById("file1").addEventListener("change", function() {
      console.log("#change");
      upload();
    });  
  },[]);
  return (
    <div className="remix__page">
      <main>
        <h2>File , Test 444</h2>
        <hr />
        file : <br />
        <input type="file" name="file1" id="file1" />
      </main>
      {/*
        <hr />
        <button onClick={() => onClick()}>Test</button>
      */}
    </div>
  );
}
