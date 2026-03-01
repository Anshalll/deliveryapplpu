import React, { useState, useEffect } from 'react'

export default function CreateItems() {

  const [Images, setyImages] = useState([])
  const [isDiscounted, setisDiscounted] = useState(false);
  const [Quant, setQuant] = useState("")
  const [Category, setCatgory] = useState("")
  const [Status, setStatus] = useState("")
  const [Price, setPrice] = useState("")
  const [Desc, setDesc] = useState("")
  const [Name, setName] = useState("")
  const [DiscounPer, setDiscounPer] = useState("")
  const [isTrue, setisTrue] = useState(false)

 
  const UploadItem = async () => {

    const data_to_send = {

      name: Name , 
      desc: Desc,
      price: Price,
      quantity: Quant,
      category: Category,
      status: Status,
      discount: DiscounPer

      
    }

    const response  = await fetch("http://localhost:5000/api/uploaditem" , {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data_to_send)
    })
    

    if (!response.ok) {
      throw new Error("Failed to upload item");
    }

    const result = await response.json();
    if (result.success) {
      window.location.reload();
      alert("Item uploaded successfully!");
      
    } else {
      alert("Failed to upload item.");
    }
  }



  const HandleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const readfile = new FileReader();

    readfile.onload = (event) => {

      const result = event.target.result;


      setyImages(prev => [...prev, result]);
    };

    readfile.readAsDataURL(file);
  };

  // validation effect
  useEffect(() => {
    // basic required fields
    const requiredFilled =
      Name.trim() !== "" &&
      Desc.trim() !== "" &&
      Price.trim() !== "" &&
      Quant.trim() !== "" &&
      Category.trim() !== "" &&
      Status.trim() !== "";

    const discountValid = !isDiscounted || (DiscounPer.trim() !== "");

    setisTrue(requiredFilled && discountValid);
  }, [Name, Desc, Price, Quant, Category, Status, isDiscounted, DiscounPer]);

  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className='w-[1200px] flex p-[10px] h-[100%] overflow-y-auto bg-zinc-800 rounded-lg shadow-lg '>

        <div className='w-[40%] items-center justify-center h-full flex border-r-2 border-black flex-col h-[100%]'>
          <div className='h-[90%] flex flex-col gap-[10px]' >

            {Images.length > 0 ? Images.map((item, index) => (
              <img key={index} src={item} alt={item} className='w-[200px] h-[250px] object-contain rounded-lg' />

            )) : <p className='text-white text-center mt-[20px]'>No images uploaded yet.</p>}

          </div>

          <div className='relative h-[10%] bg-black rounded-lg w-[90%] flex items-center justify-center p-[10px]'>
            <input  onChange={(e) => HandleImageUpload(e)} type="file" className='w-[100%] cursor-pointer opacity-0 absolute' />
            <p className='text-white'>Upload Image</p>
          </div>
        </div>

        <div className='w-[60%] gap-[20px] h-full p-[20px] text-white flex flex-col h-[100%]'>

          <label htmlFor="nalme" className='text-orange-500' >Product name</label>
          <input value={Name} onChange={(e) => setName(e.target.value)} type="text" className='w-full p-[10px] text-sm px-[10px] outline-none border-2 border-gray-400  focus:border-orange-500 rounded-lg' />



          <label htmlFor="desc" className='text-orange-500'>Description</label>
          <textarea value={Desc} rows={100} onChange={(e) => setDesc(e.target.value)} name="desc" id="desc" className='w-full outline-none rounded-lg p-[10px] border-2 border-gray-400 h-[200px] flex focus:border-orange-500'></textarea>

          <div className='flex w-full items-center p-[10px] gap-[20px]'>
            <div className='w-[50%]'>

              <label htmlFor="nalme" className='text-orange-500' >Product Price</label>
              <input value={Price} onChange={(e) => setPrice(e.target.value)} type="number" className='w-full outline-none rounded-lg border-2 p-[10px] border-gray-400  focus:border-orange-500' name="price" id="price" />

            </div>

            <div className='w-[50%]'>
              <label htmlFor="quantity" className='text-orange-500' >Product Quantity</label>
              <input value={Quant} onChange={(e) => setQuant(e.target.value)} type="text" className='w-full outline-none rounded-lg border-2 p-[10px] border-gray-400  focus:border-orange-500' name="quantity" id="quantity" />
            </div>

          </div>



          <div className='flex w-full items-center p-[10px] gap-[20px]'>

            <div className='w-[50%]'>

              <label htmlFor="categories" className='text-orange-500' >Categories</label>

              <select value={Category} onChange={(e) => setCatgory(e.target.value)} name="category" id="category" className='w-full outline-none rounded-lg border-2 border-gray-400  focus:border-orange-500 p-[10px]'>
                <option value="">None</option>
                <option value="dwad">dwa</option>
              </select>
            </div>

            <div className='w-[50%]'>
              <label htmlFor="status" className='text-orange-500'>Status</label>
              <select value={Status} onChange={(e) => setStatus(e.target.value)} name="status" className='w-full outline-none rounded-lg border-2 border-gray-400 p-[10px] focus:border-orange-500' id="status">
                <option value="">None</option>
                <option value="active">Active</option>
                <option value="active">Disable</option>
                <option value="active">Out of stock</option>
              </select>
            </div>
          </div>




          <div className='flex w-full gap-[10px] items-center '>


            <label htmlFor="discount" className='text-orange-500'>Product discount</label>
            <input onChange={() => setisDiscounted(!isDiscounted)} type="checkbox" name="discount" id="discount" />
          </div>


          {isDiscounted ? <div className=''>
            <input value={DiscounPer} onChange={(e) => setDiscounPer(e.target.value)} placeholder='Discount percentage' type="text" className='w-full outline-none rounded-lg border-2 border-gray-400 p-[10px] focus:border-orange-500' />
          </div> : <></>}

          <button
            onClick={() => UploadItem()}
            disabled={!isTrue}
            className={`w-full rounded-full text-black border-2 border-black p-[10px] shadow-lg ${
              isTrue
                ? 'bg-green-500 cursor-pointer'
                : 'bg-green-200 cursor-not-allowed'
            }`}
          >
            Add item
          </button>

        </div>

      </div>
    </div>
  )
}
