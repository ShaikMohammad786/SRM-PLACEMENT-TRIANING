export function Card({name, id, dept, age, image}: {name: string, id: string, dept: string, age: number, image: string}){

    return (

       <div className="w-64 border-2 border-black rounded-lg p-4 m-3 flex flex-col items-center shadow-md">
    
    <img
        id="stu-image"
        src={image}
        alt={name}
        className="w-40 h-40 object-cover rounded-md mb-3"
    />

    <h1 id="stu-name" className="text-xl font-bold">
        {name}
    </h1>

    <h2 id="stu-id" className="text-gray-600">
        {id}
    </h2>

    <p id="stu-dept">
        {dept}
    </p>

    <p id="stu-age">
        Age: {age}
    </p>

</div>


    )


}

export default Card;