import {React, useState, useEffect} from "react";
import Range from "./solverComponents/range";

function SolverFrontend(){





    return(
        <div>
            <div className="solver-holder">
                <form>
                    <label for="num-of-players">Select the number of players:</label>
                    <select id="num-of-players" name="num-of-players">
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                    </select>
                </form>
                <Range/>
                <button className="analyze">Analyze</button>
            </div>
        </div>
    )
}

export default SolverFrontend;