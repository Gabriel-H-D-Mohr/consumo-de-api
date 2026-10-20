export default function ThemeButton ({ dark, onToggle }) {

    return (
        <button
        style={{ background: 'linear-gradient(45deg, #bf0603,#012641)', color: 'white', 
            height: '40px', width: '150px', borderRadius: '5px', border: 'none', cursor: 'pointer',
            padding: '10px', fontSize: '16px', fontWeight: 'bold',
            marginTop: '10px', marginBottom: '10px'
        }}
        
        className="theme-button"
        onClick={onToggle}
        >
            {dark ? 'Tema claro' : 'Tema escuro'}
        </button>
    )
}