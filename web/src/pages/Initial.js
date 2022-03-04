import { useSidebar } from '../contexts/NavbarContext'

function Initial() {
  const { sidebar } = useSidebar(false)
  console.log(sidebar)
  return (
    <div className={sidebar ? 'pageContainer' : 'pageContainer expanded'}>

      <div className="pageContent">

        <h1>Initial</h1>

      </div>
    </div>
  );
}

export default Initial;