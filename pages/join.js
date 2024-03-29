import { useRouter } from "next/router";
import { useState } from 'react';
import Link from 'next/link';
import styles from "@/styles/Home.module.css";


export default function JoinRoom() {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('typing');
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const res = await fetch('/api/join?name='+name, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            
          });
        console.log("%s: %s",res, res.id);
        const id = await res.json();
        return router.push('/room/' + id.id);
        if (res) {
        //FIXME: make page succseful login 
       

        } else {
            let message = (await response.json()).message;
            setErrorMsg(message);
            return router.push('/room/0');
        }
        
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
       
            <div>
                <div style={{
                    border: '1px solid black',
                    borderRadius: '5px',
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
            <div>
                <label>
                Enter Room Name: <br/><input 
                    type="text" 
                    onChange={e => setName(e.target.value)} 
                    disabled={status === 'submitting'} 
                />
                </label>
            </div>
            <br/>
            <div>
                <button className={styles.button}disabled={
                    name.length === 0 ||
                    status === 'submitting'
                } type="submit">Join</button>
            </div> 


            <Link href="/" className="link">Go Back</Link>
            {error && <p className="error">{error}</p>}
            </div>
            </div>
     
        </form>
        <br />
        
       
        </>
      
       
    )
}