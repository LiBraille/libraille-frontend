import './button.css';

function Button({ children }){
    return(
        <button className="hero-button"  >
            {children}
        </button>
    )
}

export default Button