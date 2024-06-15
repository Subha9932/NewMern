// const getdata=(id,call)=>{
//     setTimeout(()=>{
//         console.log(id);
//         if(call){
//             call();
//         }
//     },2000)
// }
// getdata(1,()=>{
//     getdata(2,()=>{
//         getdata(3,()=>{
//             console.log("finished...");
//         })
//     })
// })
//-----------------------------------------------------------
// const getdata=(id)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log(id);
//             resolve();  
//         }, 2000);
//     })
// }
// getdata(1).then(()=>{
//     getdata(2).then(()=>{
//         getdata(3).then(()=>{
//             console.log("succuess...")
//         })
//     })
// })
//-------------------------------------------------------------
// const getdata=async(id)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log(id);
//             resolve("Succuess...")
//         },2000)
//     })
// }
// const data=async()=>{
//     await getdata(1);
//     await getdata(2);
//     await getdata(3);
//     await getdata(4);
//     await getdata("succuess..");
// }
// data();
//-------------------------------------------------------------
// const a=()=>{
//     console.log("Good Morning....");
// }
// const b=(call)=>{
//     console.log("Good Night....");
//     call();
// }
// b(a);
//-------------------------------------------------------------
// const arr=['a','b','c'];
// const obj=arr.reduce((accu,ele,i)=>{
//     accu[i]=ele;
//     return accu;
// },{});
// console.log(obj);
//------------------------------------------------------------
// const fun=(a,...b)=>{
//     let sum=0;
//     for(let i of b){
//         sum+=i;
//     }
//     console.log(sum);
// }
// fun(1,2,3,4,5,6);
//-------------------------------------------------------------
function sum(a){
    return function (b){
       if(b){
        return sum(a+b);
       }
       else{
        return a;
       }
    }
}
console.log(sum(2)(3)(4)());