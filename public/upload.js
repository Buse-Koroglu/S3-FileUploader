async function uploadfile() {
    
    const file = document.getElementById("file").files[0];
    if(!file){
        return alert("Choose A File!");
    }

    const response = await fetch(`http://localhost:5000/presigned-url?fileName=${file.name}&fileType=${file.type}`);
    const {url} = await response.json();
    // this url is presigned url on my S3 service I specified with PutObjectCommand and I am sending an HTTP request to this url.

    const uploadingPart = await fetch(url,{
        method: "PUT",
        headers: {
            "Content-Type":file.type,
        },

        body:file,
    });

    if(uploadingPart.ok){
        alert("Successful Upload");
    }else{
        alert("Upload Failed.");
    }
}