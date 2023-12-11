import { useEffect, useState } from 'react'
import WheelComponent from "./Wheel"
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import './App.css'
import SearchableDropdown from "./SearchableDropdown";
import TableToPDF from "./PDF"
function App() {

  const [names, setNames] = useState([])
  const [arr1, setArr1] = useState([])
  const [arr2, setArr2] = useState([])
  const [obj, setObj] = useState([])

  const [colors, setColors] = useState([])
  const [santa, setSanta] = useState("")
  const [user, setUser] = useState()

  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true); // Set animate state to trigger the animation
    setTimeout(() => {
      setAnimate(false); // Reset animate state after the animation duration
    }, 1000); // Change 1000 to match your animation duration in milliseconds
  };

  const onFinished = (winner) => {
    setUser(winner);
  };

  function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }


  useEffect(() => {
    if (names.length) {
      let arr = []
      for (let i = 0; i < names.length; i++) {
        if (names[i]) {
          if (i % 2 == 0) arr.push(generateRandomColor())
          else arr.push(generateRandomColor())
        }
      }
      setColors(arr)
    }
  }, [names])

  useEffect(() => {
    let arr = localStorage.getItem("arr")
    if (arr) {
      setNames(JSON.parse(arr))
    }

    let sarr1 = localStorage.getItem("arr1")
    if (sarr1) {
      setArr1(JSON.parse(sarr1))
    }

    let sarr2 = localStorage.getItem("arr2")
    if (sarr2) {
      setArr2(JSON.parse(sarr2))
    }

    let sobj = localStorage.getItem("obj")
    if (sobj) {
      setObj(JSON.parse(sobj))
    }
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setNames(results.data);
        localStorage.setItem("arr", JSON.stringify(results.data))
      },
      error: (error) => {
        console.error('Error occurred while parsing CSV:', error);
      },
    });
  };

  const onClick = ()=>{
    let sarr1 = localStorage.getItem("arr1")
    let sarr2 = localStorage.getItem("arr2")
    let sobj = localStorage.getItem("obj")

    if(sarr1){
      sarr1=JSON.parse(sarr1)
      sarr1.push(santa)
      localStorage.setItem("arr1", JSON.stringify(sarr1))
    }else{
      localStorage.setItem("arr1", JSON.stringify([santa]))
    }
    setArr1([...arr1,santa])

    if(sarr2){
      sarr2=JSON.parse(sarr2)
      sarr2.push(user)
      localStorage.setItem("arr2", JSON.stringify(sarr2))
    }else{
      localStorage.setItem("arr2", JSON.stringify([user]))
    }
    setArr2([...arr2,user])

    if(sobj){
      sobj=JSON.parse(sobj)
      sobj.push({santa: santa, user:user})
      localStorage.setItem("obj", JSON.stringify(sobj))
    }else{
      localStorage.setItem("obj", JSON.stringify([{santa: santa, user: user}]))
    }
    setObj([...obj,{santa: santa, user:user}])
    setUser("")
    setSanta("")

  }

  return (
    <div >
        <div style={{ display: "flex", marginTop: 50, marginLeft: 200, alignItems:"center" }}>
          <label style={{color:"white", marginRight: 5}}>{names.length == 0 ? "upload csv":"upload new csv"}</label>
          <input type="file" accept=".csv"  onChange={handleFileUpload} />
        </div>
      {names.length >= 1 && colors.length >= 1 && <>
        <div style={{ display: "flex", marginTop: 50, marginLeft: 200 }}>
          <SearchableDropdown options={names.filter(i=>!arr1.includes(i.name))} selectedVal={santa} label="name" handleChange={(value) => setSanta(value)} />
        </div>
       {santa && <WheelComponent
          segColors={colors}
          segments={names.map(i => i.name).filter(i => !arr2.includes(i) && i!= santa)}
          onFinished={onFinished}
        />}
        <button onClick={onClick} disabled={!santa || !user} style={{ position: "absolute", bottom: "20px", left: "250px" }}>submit</button>
      </>
      }
      <div class="watermark1">
        <p>@AVINASH-MANE</p>
      </div>
      <div class="watermark2">
       <TableToPDF obj={obj}/>
      </div>
      <div class="watermark">
        <p>@AVINASH-MANE</p>
      </div>
    </div>
  )
}

export default App
