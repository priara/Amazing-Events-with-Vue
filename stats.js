const { createApp } = Vue;

const options = {
    data() {
        return {
            eventos: [],
            currentDate:"",
            eventosCategoriaPas:[],
            eventosCategoriaFuturo:[],
            nombreMayorPorcentajeAss: [],
            nombreMenorPorcentajeAss: [],
            numeroMayorPorcentajeAss: Number,
            numeroMenorPorcentajeAss: Number,
            arrayOrdenadoMayorMenorCapacidad: [],
            eventoMayorCapacidad: [],
            numeroEventoMayorCapacidad: Number,
            arrayPorcentaje: [],
            categoriasPasadas : [],
            categoriasFuturas: [],
            estadisticasPas : [],
            estadisticasFut: [],
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((respuesta) => respuesta.json())
            .then((data) => {
                this.eventos = data.events;
                
                console.log(this.eventos);

                this.currentDate = data.currentDate;

                //PRIMERA TABLA
                this.arrayOrdenadoMayorMenorCapacidad = Array.from(this.eventos).sort(function (a,b){
                    return b.capacity - a.capacity})
                console.log(this.arrayOrdenadoMayorMenorCapacidad);

                this.eventosCategoriaPas = this.eventos.filter(evento => evento.date < this.currentDate)
                console.log(this.eventosCategoriaPas);

                this.arrayPorcentaje = this.eventosCategoriaPas.sort((a, b) => calculoPorcentaje(a.assistance, a.capacity) - calculoPorcentaje(b.assistance, b.capacity))
                    console.log(this.arrayPorcentaje);

                this.nombreMenorPorcentajeAss = this.arrayPorcentaje[0].name
                this.nombreMayorPorcentajeAss = this.arrayPorcentaje[this.arrayPorcentaje.length-1].name
                console.log(this.nombreMenorPorcentajeAss);
                console.log(this.nombreMayorPorcentajeAss);

                this.numeroMayorPorcentajeAss = calculoPorcentaje(this.arrayPorcentaje[this.arrayPorcentaje.length-1].assistance, this.arrayPorcentaje[this.arrayPorcentaje.length-1].capacity).toFixed(1)
                this.numeroMenorPorcentajeAss =calculoPorcentaje(this.arrayPorcentaje[0].assistance, this.arrayPorcentaje[0].capacity).toFixed(1)
                console.log(this.numeroMayorPorcentajeAss);
                console.log(this.numeroMenorPorcentajeAss);

                this.eventoMayorCapacidad = this.arrayOrdenadoMayorMenorCapacidad[0].name
                console.log(this.eventoMayorCapacidad);

                this.numeroEventoMayorCapacidad = this.arrayOrdenadoMayorMenorCapacidad[0].capacity.toLocaleString()
                console.log( this.numeroEventoMayorCapacidad);
                
                this.eventosCategoriaFuturo = this.eventos.filter(evento => evento.date >= this.currentDate)
                console.log(this.eventosCategoriaFuturo);

                /////////////////////////////////////////////////////////
                //SEGUNDA TABLA
                    this.categoriasPasadas = [...new Set(data.events.filter((evento) => evento.category).map((evento) => evento.category))];
                    console.log(this.categoriasPasadas);

                    this.estadisticasPas = this.categoriasPasadas.map(categoria => {
                        let eventosCategoriaPas = this.eventosCategoriaPas.filter( evento => evento.category == categoria )
                        let gananciaCategoria = 0            
                        eventosCategoriaPas.forEach( (evento) => {
                            let {price, assistance} = evento
                            let resultadoGanancia = price * assistance
                            gananciaCategoria = gananciaCategoria + resultadoGanancia 
                        } )
                        let porcentajeAsistencia = 0
                        eventosCategoriaPas.forEach( (evento) => {
                            let {capacity, assistance} = evento
                            let resultadoPorcentaje = assistance / (capacity / 100)
                            porcentajeAsistencia += resultadoPorcentaje
                        } )
                        let aux = {
                            nombre: categoria,
                            eventos: eventosCategoriaPas,
                            ganancias: gananciaCategoria.toLocaleString(),
                            porcentajeDeAsistencia: (porcentajeAsistencia / eventosCategoriaPas.length).toFixed()
                        }
                        return aux
                    })
                    console.log(this.estadisticasPas);

                    this.categoriasFuturas = [...new Set(this.eventosCategoriaFuturo.filter((evento) => evento.category).map((evento) => evento.category))];
                    console.log(this.categoriasFuturas);
                    this.estadisticasFut = this.categoriasFuturas.map(categoria => {
                        let eventosCategoriaFuturo = this.eventosCategoriaFuturo.filter( evento => evento.category == categoria )
                        let gananciaCategoria = 0            
                        eventosCategoriaFuturo.forEach( (evento) => {
                            let {price, estimate} = evento
                            let resultadoGanancia = price * estimate
                            gananciaCategoria = gananciaCategoria + resultadoGanancia 
                        } )
                        let porcentajeAsistencia = 0
                        eventosCategoriaFuturo.forEach( (evento) => {
                            let {capacity, estimate} = evento
                            let resultadoPorcentaje = estimate / (capacity / 100)
                            porcentajeAsistencia += resultadoPorcentaje
                        } )
                        let aux = {
                            nombre: categoria,
                            eventos: eventosCategoriaFuturo,
                            ganancias: gananciaCategoria.toLocaleString(),
                            porcentajeDeAsistencia: (porcentajeAsistencia / eventosCategoriaFuturo.length).toFixed()
                        }
                        return aux
                    })
                    console.log(this.estadisticasFut);



                function calculoPorcentaje(assistance, capacidad){
                    let porcentaje = (assistance / capacidad) *100
                    return porcentaje
                }

                          
            //     this.categoriasPasadas.forEach( (evento) => {
            //     let gananciaCategoria = 0  
            //     let {price, assistance} = evento
            //     let resultadoGanancia = price * assistance
            //     this.gananciaEventosPasados = gananciaCategoria + resultadoGanancia 
            //     console.log(this.gananciaEventosPasados.toLocaleString());
            // } )

            })
            .catch((error) => console.log(error));


    },
    methods: {
        
    }
}
const app = createApp(options);

app.mount("#app");
