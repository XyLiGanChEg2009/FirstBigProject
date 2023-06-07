import './Header.css';

const Header = ({ showComponent }) => {
    return(
        <div className='Header'>
            <div onClick={() => showComponent('Calculator')} className='header-buttons' > Калькулятор </div>
            <div onClick={() => showComponent('Graph2D')} className='header-buttons'> Graph2D </div>
            <div onClick={() => showComponent('Graph3D')} className='header-buttons'> Graph3D </div>
            <div onClick={() => showComponent('HelloWorld')} className='header-buttons'> Очистить экран </div>
        </div>
    );
}

export default Header;