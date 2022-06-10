const Home = () => {
    const handleClick = () => {
        console.log("hello");
    }
    return ( 
        <div className="Home">
            <h1>HOMEPAGE</h1>
            <button onClick= {handleClick}>click me!</button>
        </div>
     );
}
 
export default Home;