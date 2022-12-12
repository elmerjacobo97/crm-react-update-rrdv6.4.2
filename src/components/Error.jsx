const Error = ({children}) => {
    return (
        <div className={'text-red-600 text-center'}>
            {children}
        </div>
    );
};

export default Error;