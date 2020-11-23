import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
//import { isLiteralTypeNode } from 'typescript';
//import { callbackify } from 'util'
import { fetchDogs } from './redux/actions'
import './css/dog.css'

interface state {
    state: any
}

function DogContaineir(props: any, state: any) {
    const dogsName: any = [];
    const currentDog: any = [];
    const [sel, setsel] = useState("");
    const [actualDog, setactualDog] = useState([])
    let [color, setColor] = useState("");
    let [genre, setGenre] = useState("");

    const selection_one = useRef(null);
    const selection_two = useRef(null);
    const selection_three = useRef(null);
    const selection_four = useRef(null);

    useEffect(() => {
        //Executando método do props para fazer o dispatch 
        props.fetchDogs()
        call()
        // Carregando inforamções salvas do usuário

        if (sessionStorage.getItem('selectedBreed')) {
            const local = sessionStorage.getItem('selectedBreed')
            setsel(local!)
        }
        if (sessionStorage.getItem('color')) {
            const local = sessionStorage.getItem('color')
            setColor(local!)
        }
        if (sessionStorage.getItem('genre')) {
            const local = sessionStorage.getItem('genre')
            setGenre(local!)
        }
    }, [])

    //useEffect para mostrar o componenete de sub-raças, caso o valor carregado possua alguma
    useEffect(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('selectedBreed')) {

            const local = sessionStorage.getItem('selectedBreed')
            setactualDog(props.dogsBreed[local!])
        }
    }, [props])

    //Função que cria a array com os nomes das raças dos cães. Utilizada para mostrar os nomes nas opções do select 
    const call = () => {
        const dogs = props.dogsBreed
        const names = Object.getOwnPropertyNames(dogs);
        for (let i = 1; i < names.length; i++) {
            dogsName.push(names[i]);

        }


    }
    // componente para carregar variações da raça, caso existam
    function Subb() {
        if (actualDog && actualDog.length !== 0) {
            return (
                <div id="extra">
                    <h3>Type</h3>
                    <select id="sub" ref={selection_two} onChange={(e) => { saveData(e.target.value) }}>
                        {actualDog.map((dog: any) => <option value={dog} key={dog} >{dog}</option>)}
                    </select>
                </div>
            )
        } return null
    }

    //função para carregar preço total das opções

    function Total() {

        var colorPrice = 20.00;
        var genrePrice = 30.00;
        var breedPrice = 45.50;
        if (actualDog) {
            breedPrice = 45.50
        }
        if (color === "branco") {
            colorPrice = 15.75
        }
        if (color === "preto") {
            colorPrice = 20.98
        }
        if (color === "marrom") {
            colorPrice = 25.45
        }
        if (genre === "female") {
            genrePrice = 30.50
        }
        if (genre === "male") {
            genrePrice = 25.75
        }
        const totalPrice = (genrePrice + colorPrice + breedPrice)
        const decimals = totalPrice.toFixed(2);
        return (<div> <h3 id='total'> R$: {decimals} </h3> </div>)

    }
    //Salvando as opções escolhidas pelo cliente, caso a página precise ser recarregada durante a compra

    const saveData = (event: any) => {
        const breeds = (selection_one as any).current.value;
        sessionStorage.setItem('selectedBreed', breeds);
        const color = (selection_three as any).current.value;
        sessionStorage.setItem('color', color);
        const genre = (selection_four as any).current.value;
        sessionStorage.setItem('genre', genre);
    }

    const buy = ()=>{
        alert('Obrigado por sua compra!')
    }
    return (
        props.loading ? (<h2>Carregando...</h2>) : props.error ? (<h2>Erro</h2>) :
            <div>
                {call()}
                {dogsName ?
                    (<div id="dogContainer">
                        <h2>Select Your Dog</h2>
                       <h3>Breed</h3> 

                        <select name="breed" id="breed" ref={selection_one} value={sel} onChange={(e) => { setsel(e.target.value); setactualDog(props.dogsBreed[e.target.value]); saveData(e.target.value) }}>
                            {dogsName.map((x: any) => <option value={x} key={x}> {x}</option>)}
                        </select>
                        <Subb />
                        <h3>Color</h3>
                        <select id="color" name="" ref={selection_three} value={color} onChange={(e) => { setColor(e.target.value); saveData(e.target.value) }}>
                            <option value="preto" className="colored">preto</option>
                            <option value="branco" className="colored">branco</option>
                            <option value="marrom" className="colored">marrom</option>
                        </select>
                        <h3>Boy or Girl</h3>
                        <select id="genre" name="" value={genre} ref={selection_four} onChange={(e) => { setGenre(e.target.value); saveData(e.target.value) }}>
                            <option value="female">fêmea</option>
                            <option value="male">macho</option>
                        </select>
                        <div id='end'>
                            <h3>Total:</h3>
                            <Total />
                            <button id='buy' onClick={buy}>Comprar</button>
                        </div>
                    </div>) : (<h2>erro</h2>)}

            </div>


    )
}
const mapStateToProps = (state: any) => {
    return {
        loading: state.loading,
        dogsBreed: state.dogs,
        error: state.error
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchDogs: () => {
            dispatch(fetchDogs())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DogContaineir)