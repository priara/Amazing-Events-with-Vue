const { createApp } = Vue;

const options = {
    data() {
        return {
            eventos: [],
            cadaEvento: [],
            id: "",
            parametro: "",
            parametros: "",
        };
    },
    created() {
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then((respuesta) => respuesta.json())
            .then((data) => {
                this.eventos = data.events;
                console.log(this.eventos);
                this.parametro = location.search
                this.parametros = new URLSearchParams(this.parametro)
                this.id = this.parametros.get('parametro')
                this.cadaEvento = this.eventos.find(evento => evento._id == this.id)
            })
            .catch((error) => console.log(error));
    },
}
const app = createApp(options);

app.mount("#app");
