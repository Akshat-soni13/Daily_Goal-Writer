let shh=document.querySelector(".sh-hour-hand");
let shm=document.querySelector(".sh-min-hand");
let ssh=document.querySelector(".sh-sec-hand");
let sdh=document.querySelector(".sh-dh");
let sdm=document.querySelector(".sh-dm");
let sds=document.querySelector(".sh-ds");
setInterval(()=>{
    let time=new Date();
    let h=time.getHours();
    let m=time.getMinutes();
    let s=time.getSeconds();
    let hrotation=(30*h)+(h/2);
    let mrotation=6*m;
    let srotation=6*s;
    shh.style.transform=`rotate(${hrotation}deg)`
    shm.style.transform=`rotate(${mrotation}deg)`
    ssh.style.transform=`rotate(${srotation}deg)`
    sdh.innerHTML=(h<10?'0'+h:h)>12?h-=12:h; 
    sdm.innerHTML=m<10?'0'+m:m;
    sds.innerHTML=s<10?'0'+s:s;
})