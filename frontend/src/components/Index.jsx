import React, { useState, useEffect } from 'react'
import Axios from "axios"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"

export default function Index() {

  const [mascotas, setMascotas] = useState([])
  const [nombre, setNombre] = useState("")
  const [raza, setRaza] = useState("")
  const [edad, setEdad] = useState("")
  const [ubicacion, setUbicacion] = useState("")

  useEffect(() => {
    obtenerMascotas()
  }, [])

  const obtenerMascotas = async () => {
    const respuesta = await Axios.get("http://localhost:4000/mascotas/mostrarMascotas")
    setMascotas(respuesta.data)
    console.log(respuesta);
  }

  const guardarMascota = async (e) => {
    e.preventDefault()
    const mascota = {
      nombre,
      edad,
      raza,
      ubicacion,
    }
    const token = sessionStorage.getItem("token")
    const respuesta = await Axios.post("http://localhost:4000/mascotas/crear", mascota,
      { headers: { "autorizacion": token } })
    const mensaje = respuesta.data.mensaje;
    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.href = "/index"
    }, 1800);
  }

  const eliminar = async (id) => {
    const token = sessionStorage.getItem("token")
    const respuesta = await Axios.delete("http://localhost:4000/mascotas/eliminar/" + id,
      { headers: { "autorizacion": token } })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    })
    obtenerMascotas()
  }

  return (
    <div>
      <header className="py-2 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-dog "> Administrador de Mascotas </i>

              </h1>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addMascota">
              <i className="fas fa-plus">Agregar Mascota</i>
            </Link>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="input-group">
              <div className="form-control mr-sm-2" type="search" placeholder="Buscar..." aria-label="search">

              </div>
            </div>
          </div>
        </div>
      </nav>

      {/*Mostrar mascotas*/}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Mascotas, admin {sessionStorage.getItem("nombre")}</h4>
                </div>
                <table className="table table-responsive-lg table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Edad</th>
                      <th>Raza</th>
                      <th>Ubicacion</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      mascotas.map((mascota, i) => (
                        <tr key={mascota._id}>
                          <td>{i}</td>
                          <td>{mascota.nombre}</td>
                          <td>{mascota.edad}</td>
                          <td>{mascota.raza}</td>
                          <td>{mascota.ubicacion}</td>
                          <td>
                            <button className="btn btn-warning mr-1" onClick={() => eliminar(mascota._id)}> Eliminar</button>
                            <button className="btn btn-danger mr-1">Editar</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*MODAL */}
      <div className="modal fade" id="addMascota">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                Agregar Mascota
              </h5>
              <button className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={guardarMascota}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" required onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Edad</label>
                  <input type="text" className="form-control" required onChange={(e) => setEdad(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Raza</label>
                  <input type="text" className="form-control" required onChange={(e) => setRaza(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Ubicacion</label>
                  <input type="text" className="form-control" required onChange={(e) => setUbicacion(e.target.value)} />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

    </div >
  )
}
