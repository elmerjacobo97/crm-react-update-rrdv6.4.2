import {Form, redirect, useActionData, useNavigate} from "react-router-dom";
import Formulario from "../components/Formulario.jsx";
import Error from "../components/Error.jsx";
import {agregarCliente} from "../data/clientes.js";

// action - procesar un formulario
export async function action({request}) {
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

    await agregarCliente(datos);

    // redireccionar al user al home
    return redirect('/');
}

const NuevoCliente = () => {
    const navigate = useNavigate();
    const errores = useActionData();

    return (
        <>
            <h1 className={'font-black text-4xl text-indigo-900'}>Nuevo Cliente</h1>
            <p className={'mt-3'}>Llena todos los campos para registrar un nuevo cliente</p>

            <div className={'flex justify-end'}>
                <button
                    type={'button'}
                    onClick={() => navigate('/')}
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
                    <Formulario />
                </Form>
            </div>
        </>
    );
};

export default NuevoCliente;