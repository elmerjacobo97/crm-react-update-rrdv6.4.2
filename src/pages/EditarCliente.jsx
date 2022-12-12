import {Form, redirect, useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {obtenerCliente, actualizarCliente} from "../data/clientes.js";
import Formulario from "../components/Formulario.jsx";
import Error from "../components/Error.jsx";

export async function loader({params}) {
    const cliente = await obtenerCliente(params.clienteId)

    // si el cliente no existe
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'El cliente no fue encontrado'
        })
    }

    // retornar cliente
    return cliente
}

export async function action({request, params}) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get('email');

    // validación
    const errores = [];
    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }

    // expresión regular
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push('El email no es válido')
    }

    // retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }

    // actualizar el cliente
    await actualizarCliente(params.clienteId, datos);

    // redireccionar al user al home
    return redirect('/');
}

const EditarCliente = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className={'font-black text-4xl text-indigo-900'}>Editar Cliente</h1>
            <p className={'mt-3'}>A continuación podrás modificar los datos de un cliente</p>

            <div className={'flex justify-end'}>
                <button
                    type={'button'}
                    onClick={() => navigate(-1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>

            <div className={'bg-white shadow-md rounded-md md:w-3/5 mx-auto px-5 py-10 mt-5'}>
                {
                    errores?.length && errores.map((error, i) => (
                        <Error key={i}>{error}</Error>
                    ))
                }
                <Form
                    method={'post'}
                    noValidate={true}
                >
                    <Formulario cliente={cliente} />
                </Form>
            </div>
        </>
    );
};

export default EditarCliente;