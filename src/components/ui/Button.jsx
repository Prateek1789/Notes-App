
const Button = ({ type, name, width, ...props}) => {
    return (
        <button type={type} 
                className={`login-btn ${width ? width : 'w-60 md:w-80'} focus:outline-2 focus:outline-blue-600`}
                {...props}>
            {name}
        </button>
    )
}

export default Button