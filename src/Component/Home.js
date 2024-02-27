import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link} from "react-router-dom";
import { IoHeartOutline } from 'react-icons/io5';
import { CgShoppingCart } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { updateArr } from './store/Slice';
import './Home.scss'

export const Home = ()=>{
    const state = useSelector((samp)=>samp.data)//to read product.json
    console.log(state)
    let dis = useDispatch()

    
    //add

    const add = (i)=>{
        let a = state.arr.map((v,index)=>{

            return v.id === i? {...v,isadd:true} : v
        })
        dis(updateArr(a))
        
    }

    //favourite

    const fav = (i)=>{
        let b  = state.arr.map((v,index)=>{

            return i === v.id? {...v,isfav : !v.isfav} : v
        })
        dis(updateArr(b))
    }

    //plus

    const plus = (i)=>{
        console.log("plus")
        let c = state.arr.map((v,ind)=>{
            //return i === v.id ? {...v,count:v.count+1} : v

            if(v.id === i)
            {
               if(v.count < 10)
               {
                return {...v,count:v.count+1}
               }
               else{
                alert("You have exceeded the limit!!!!")
                return v
               }
            }
            else
            {
                return v
            }

        })
        dis(updateArr(c))
    }

    //minus

    const minus = (i)=>{
        console.log("minus")

        let d = state.arr.map((v,ind)=>{

            if(v.id === i)
            {
                if(v.count > 1)
                {
                    return {...v,count:v.count-1}
                }
                else
                {
                    return {...v,isadd:false}
                }
            }
            else
            {
                return v
            }
        })
        dis(updateArr(d))
    }

    //drop

    const drop =(i)=>{
        console.log("drop")

        let f = state.arr.map((v,ind)=>{

            return v.id === i ? {...v,isSelect:!v.isSelect} : v
        })
        dis(updateArr(f))
    }

    //handleSelect 

    const handleSelect = (val,i,ind)=>{ //val=>parent value, ind => parent index , i => v.id child id

        console.log("handleSelect")
        let g = state.arr.map((m,n)=>{

            return i === m.id ? {...m,kg :val.kg, price:val.price,isSelect : false, weight:m.weight.map((x,y)=>{return ind === y?{...x,isActive:true}:{...x,isActive:false}})} : m 
        })
        
        dis(updateArr(g))
       
    }

   

    return(
        <div>
           
            <nav className="navbar">
                
                <Link to='/fav'><IoHeartOutline /></Link>
                <h1 style={{color:"#4CAF50"}}>FRESH FRUITS</h1>
                <Link to='/cart'><CgShoppingCart /></Link>
            </nav>
            <div className='container align-items-center justify-content-center'>
           
            {
                state.arr.map((v,i)=>{
                    return(
                        <div className ="card col-sm-6 col-md-4 col-lg-3">
                           
                            <Link to={`/det/${v.id}`}>
                                <div>
                                    <img src={v.image} alt="Tea" className="img-fluid"/>
                                </div>
                            </Link>
                           
                            <p style={{fontSize:"16px",color:"#c7c7c7"}}>Fresho</p>
                            <p style={{fontSize: "20px"}}>{v.tname}</p>
                            <div style={{display : "flex"}}>
                                <h4>₹{v.price}</h4>

                                <div className="dropdown">
                                    <p onClick={()=>drop(v.id)}>{v.kg}</p>
                                {
                                    v.isSelect? <div className="dropdown-options">
                                         
                                        {
                                            v.weight.map((value,index)=>{ 
                                                 return <p style={{border: "1px solid black",
                                                    width: "80px",
                                                    height: "25px"}} className="dropOpen" onClick={()=>handleSelect(value,v.id,index)}>{value.kg}<span>{value.price}</span></p> 
                                            })
                                        }
                                    </div> :
                                    ""
                                }
                                </div>


                            </div>

                              <div style={{display : "flex"}}>  
                            <div onClick={()=>fav(v.id)} style={{display:"flex",fontSize: "2em"}}>
                                {
                                    v.isfav ? <FcLike /> : <IoHeartOutline />
                                }
                            
                            </div>
                            {
                                v.isadd ? 
                                <div> 
                                    <button className="btn btn-success" onClick={()=>minus(v.id,v.count)}> - </button>
                                    <h5 style={{textAlign:"center",color:"#4CAF50"}}> {v.count} </h5>
                                    <button onClick={()=>plus(v.id)}> + </button>

                                </div> : <button onClick={()=>add(v.id)}>Add</button>

                            }
                            </div>
                        </div>
                    )
                })
            }
            
            </div>
            <footer class="text-center">
                <div class="footer-links">
                    <Link to='/'>Home</Link> |
                    <Link to='/fav'>My Favourites</Link> |
                    <Link to='/cart'>My cart</Link> 
                </div>
            </footer>
        </div>     
    )
}
