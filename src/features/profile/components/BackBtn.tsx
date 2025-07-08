import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useNavigate();

    return(
        <button 
        className="flex ml-1 mb-4"
        onClick={() => navigate('/profile')}
        >
        <img src="/img/back.png" className="w-7 h-7"></img>
        <p className="text-xl text-[#6563ff]">Назад</p>
        </button>
    )
}

export default BackBtn;