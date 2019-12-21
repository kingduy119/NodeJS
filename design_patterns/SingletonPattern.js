const Singleton = (function(){
    function ProcessManager() {
      this.numProcess = 0;
    }
    
    let pManager;
    
    function createProcessManager() {
      pManager = new ProcessManager();
      return pManager;
    }
    
    return {
      gerProcessManager:()=>{
        if(!pManager)
          pManager = createProcessManager();
        return pManager;
      }
    };
  })()
  
  const procress = Singleton.gerProcessManager();
  const procress1 = Singleton.gerProcessManager();
  
  
  console.log(procress === procress1);