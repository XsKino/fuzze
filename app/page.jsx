import Image from "next/image"

const Home = () => {

  const [publicKey, setPublicKey] = useState(null);
  const router =useRouter();

  useEffect(() => {
          let key = window.localStorage.getItem("publicKey");
          setPublicKey(key);
  }, [])

  const signIn = async () => {
  console.log("nya");

  //Si no tiene phantom
  const provider = window?.phantom?.solana;
  const {solana} = window;

  if (!provider?.isPhantom || !solana.isPhantom){
      toast.error("Phantom no esta instalado");
      setTimeout(() =>{
          window.open("https//phantom.app/", "_blank")
      }, 2000);
      return;
  }

  let phantom;
  if (provider?.isPhantom) phantom = provider;

  const { publicKey } = await phantom.connect();
  console.log("publicKey: ", publicKey.toString());
  setPublicKey(publicKey.toString());
  window.localStorage.setItem("publicKey", publicKey.toString());

  toast.success("Conectado");

  };

  const signout = async () => {
      if (window){
          const { solana } = window;
          window.localStorage.removeItem("publicKey");
          setPublicKey(null);
          solana.disconnect();
          router.reload(window?.location?.pathname); 

      }


  }


  return(
      <div className="bg-puple">
        <div className="text-texti bg-puple">
          <div>
            <nav className="text-left">
              <div className="flex items-center justify-between">
                <h1 className="relative">
                  <div>
                    <a href="./index.html" className="text-7xl font-bold p-6 border-b border-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">Fuzze</a>
                  </div>
                </h1>
                <ul className="flex text-lg mt-10 space-x-6">
                  <li className="py-1">
                    <a href="#" className="px-4 flex justify-end border-r-4 border-transparent transform transition-transform duration-300 hover:-translate-y-2">
                      <span>Sodas</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a href="#" className="px-4 flex justify-end border-r-4 border-transparent transform transition-transform duration-300 hover:-translate-y-2">
                      <span>Suscription</span>
                    </a>
                  </li>
                  <li className="py-1">
                    <a href="#" className="px-4 flex justify-end border-r-4 border-transparent transform transition-transform duration-300 hover:-translate-y-2">
                      <span>About us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>


  <div className="bg-puple mt-10 p-6 font-Ubuntu bg-cover bg-center">

     <div className="flex flex-col justify-center items-center">
      <h1 className="text-6xl text-texti justify-end">Start</h1>
      <h1 className="text-6xl mt-10 text-texti justify-center">Buying</h1>
      <h1 className="text-6xl mt-10 text-texti justify-center">Now!:</h1>
     </div>


     {publicKey ? (
      <div className="pt-10 flex flex-col place-items-center justify-center">
      <button
      type="submit"
      className="inline-flex- h-8 w-52 justify-center bg-violet-500 text-white"
      onClick ={signout}
      >
          desconecta gil
      </button>
      </div>
     ) : (
    <div className="pt-10 flex flex-col place-items-center justify-center">
    <button
    className="inline-flex- h-8 w-52 justify-center bg-violet-500 text-white"
    onClick ={signIn}
    >
        conecta gil
    </button>
    </div>  
     )}

  </div>
</div>



   );
   
}

export default Home;