import * as React from 'react';
import './App.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [alignment, setAlignment] = React.useState('m');
  const [alignmentW, setAlignmentW] = React.useState('kg');
  const [input, setInput] = useState({
    height:'',
    weight:'',
    inches:''
  })
  const [result,setResult] = useState({
    bmi:'0',
    status:'---',
    color:'black'
  })
  const [percentage,setPersentage] = useState('0%')
  const [isHeight,setIsHeight]=useState(true)
  const [isWeight,setIsWeight]=useState(true)
  const [isInches,setIsInches]=useState(true)

  const validate =(e)=>{
    if(!!e.target.value.match('^[0-9 .]*$')){
      if(e.target.name=='height'){
        setIsHeight(true)
      }else if(e.target.name=='weight'){
        setIsWeight(true)
      }else if(e.target.name=='inches'){
        setIsInches(true)
      }
      setInput(
        {
          ...input,[e.target.name]:e.target.value
        }
      )
    }else{
      if(e.target.name=='height'){
        setIsHeight(false)
      }else if(e.target.name=='weight'){
        setIsWeight(false)
      }else if(e.target.name=='inches'){
        setIsInches(false)
      }
      setInput(
        {
          ...input,[e.target.name]:e.target.value
        }
      )
    }
  }

  const convertion =()=>{
    let h=0
    let w=0
    if (alignment=='m'){
      h=input.height
    }else if(alignment=='cm'){
      h=input.height/100
    }else{
      h=(input.height*0.3048)+(input.inches*0.0254)
    }
    if(alignmentW=='kg'){
      w=input.weight
    }else{
      w=input.weight*0.45359237
    }
    return[h,w]
  }
  console.log(input);
  
  const calculate=()=>{
    if (input.height=='' || input.weight=='0'|| input.weight=='') {
      alert('please enter the values')
    }else{
      const ar=convertion()
      const bmi =String(ar[1]/ar[0]**2).slice(0,5)
      // setting status according to bmi
      if (bmi<18.5) {
        setResult({
          bmi:bmi,
          status:'Underweight',
          color:'blue'
        })
      }else if(bmi>=18.5 && bmi<25){
        setResult({
          bmi:bmi,
          status:'Healthy weight',
          color:'green'
        }) 
      }else if(bmi>=25 && bmi<30){
        setResult({
          bmi:bmi,
          status:'Overweight',
          color:'orange'
        }) 
      }else if(bmi>=30 && bmi<35){
        setResult({
          bmi:bmi,
          status:'Obese',
          color:'red'
        }) 
      }else{
        setResult({
          bmi:bmi,
          status:'Extremely obese',
          color:'red'
        }) 
      }
      // calculating percentage for animation based on bmi
      if (bmi<=10) {
        setPersentage('0%')
      }else if(bmi<45){
        setPersentage(100*(bmi-10)/30+'%')
      }else if(bmi>=45){
        setPersentage('100%')
      }
      
    } 
  }

  const reset=()=>{
    setInput({
      height:'',
      weight:'',
      inches:''
    })
    setResult({
      bmi:'0',
      status:'---',
      color:'black'
    })
  }
  
  const handleChangeW = (event, newAlignment) => {
    setAlignmentW(newAlignment);
  };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
console.log(percentage);
const styleobj ={left:percentage}

  

  return (
    <>
     <h1 className='mt-md-5 mt-4 text-center'>BMI Calculator</h1>
     <div className='container'>
      <div className='row ms-1 ms-md-0 mt-4 mt-md-5 w-100'>
        <div className='col-md-2'></div>
        <div className='col-md-8 gap-4 d-md-flex'>
          <div id='first' className='shadow p-4 rounded w-100'>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="m">meter</ToggleButton>
              <ToggleButton value="cm">centi meter</ToggleButton>
              <ToggleButton value="ft">feet</ToggleButton>
            </ToggleButtonGroup>
            <br />
            {alignment=='m'?
            <TextField className='mt-3 w-100' name='height' value={input.height} onChange={(e)=>{validate(e)}} id="outlined-basic" label="height(m)" variant="outlined" />:alignment=='cm'?
            <TextField className='mt-3 w-100' name='height' value={input.height} onChange={(e)=>{validate(e)}} id="outlined-basic" label="height(cm)" variant="outlined" /> :<div className='d-flex'>
            <TextField className='mt-3 w-100' name='height' value={input.height} onChange={(e)=>{validate(e)}} id="outlined-basic" label="height(ft)" variant="outlined" />
            <TextField className='mt-3 w-100 ms-2' name='inches' value={input.inches} onChange={(e)=>{validate(e)}} id="outlined-basic" label="height(in)" variant="outlined" /></div> }
            {(!isHeight || !isInches) && <span className='text-danger'>Invalid input</span>}
            <ToggleButtonGroup
              className='mt-4'
              color="primary"
              value={alignmentW}
              exclusive
              onChange={handleChangeW}
              aria-label="Platform"
            >
              <ToggleButton value="kg">kilogram</ToggleButton>
              <ToggleButton value="lb">pound</ToggleButton>
            </ToggleButtonGroup>
            <br />
            {alignmentW=='kg'?
            <TextField className='mt-3 w-100' name='weight' value={input.weight} onChange={(e)=>{validate(e)}} id="outlined-basic" label="weight(kg)" variant="outlined" />:
            <TextField className='mt-3 w-100' name='weight' value={input.weight} onChange={(e)=>{validate(e)}} id="outlined-basic" label="weight(lb)" variant="outlined" />
            }
            {!isWeight && <span className='text-danger'>Invalid input</span>}
            <br />
            <div className='d-flex'>
              <button className='w-100 p-3 mt-3 btn btn-success' onClick={calculate} disabled={isHeight && isWeight && isInches ? false:true}>Caculate <FontAwesomeIcon icon={faCalculator} /></button>
              <button className='w-100 p-3 mt-3 ms-4 btn btn-danger' onClick={reset}>Reset <FontAwesomeIcon icon={faRotateLeft} /></button>
            </div>

          </div>
          <div id='second' className='mb-3 mb-md-0 mt-3 mt-md-0 shadow d-flex align-items-center rounded justify-content-center w-100'>
            <div className='w-100 p-3'>
              <h3 style={{color:result.color}} className='text-center'>BMI={result.bmi}</h3>
              <h2 style={{color:result.color}} className='text-center mt-3'>{result.status}</h2>
              
              <div id='bar' className='mb-3 mb-md-0 d-flex mt-4 text-light'>
                <div id='start' >10bmi</div>
                <div id='pointer' style={styleobj}></div>
                <div className='bardata d-flex align-items-center justify-content-center' style={{backgroundColor:'blue',height:'25px',width:'28.33%'}}><span>Underweight</span></div>
                <div className='bardata d-flex align-items-center justify-content-center' style={{backgroundColor:'green',height:'25px',width:'21.66%'}}><span>Healthy</span></div>
                <div className='bardata d-flex align-items-center justify-content-center' style={{backgroundColor:'orange',height:'25px',width:'16.66%'}}><span>overweight</span></div>
                <div className='bardata d-flex align-items-center justify-content-center' style={{backgroundColor:'red ',height:'25px',width:'33.35%'}}><span>obese</span></div>
                <div id='end' >40bmi</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
     </div>
    </>
  )
}

export default App
