
import { useEffect, useRef, useState } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
//import { Form, json, useActionData, redirect } from "remix";
import axios from '~/lib/axios'
import {ImageUtil} from '~/lib/ImageUtil'

export let meta: MetaFunction = () => {
  return {
    title: "test",
    description: "Welcome to remix!"
  };
};

export default function TestCompress() {
  const [upimage, setUpimage] = useState({ blob: null, fileUrl: null, fileName: ''});
//  console.log("#TestFile");
  const upload = async function(){
    const files = document.querySelector<HTMLInputElement>('#file1').files;
    const file = files[0]; 
    if (typeof file === "undefined") {
      console.error("none, fileObject");
      return;
    }
    try {
      const compFile = await ImageUtil.getCompressImageFileAsync(file);
      //ファイルサイズの表示
      const beforeSize = (file.size / 1024 / 1024).toFixed(4);
      const afterSize = (compFile.size / 1024 / 1024).toFixed(4);
      console.log(beforeSize, afterSize);
      // 画像情報の設定
      const blob = compFile;
      const fileUrl = await ImageUtil.getDataUrlFromFile(compFile);
      const fileName = file.name;
      // POST
      const params = new FormData();
      params.append("file1", blob, fileName);
      axios.post("/api/file/upload", params).then(function(res) {
        console.log(res.data);
        alert("OK, file");
        setUpimage({blob, fileUrl, fileName});
      })
      .catch(function(error) {
        console.error(error);
        alert("Error, file upload");
      });
    } catch (err) {
      console.error(err);
    } finally {
      console.log("finally, compress");
    }        
  };
// console.log(upimage);
  useEffect(() => {
    document.getElementById("file1").addEventListener("change", function() {
      console.log("#change");
      upload();
    });  
  },[]);
  return (
    <div className="remix__page">
      <main>
        <h2>compress, 1</h2>
        <hr />
        file : <br />
        <input type="file" name="file1" id="file1" />
      </main>
      img:<br />
      <img src={upimage.fileUrl} />
      {/*
        <hr />
        <button onClick={() => onClick()}>Test</button>
      */}
    </div>
  );
}
