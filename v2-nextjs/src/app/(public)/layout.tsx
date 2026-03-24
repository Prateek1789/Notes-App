import Navbar from "@/components/layout/NavBar";

const LandingPageLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <header className="w-full h-auto px-2 flex items-center justify-center top-2 left-0 fixed z-999">
        <Navbar />
      </header>
      { children }
    </>
  )
};

export default LandingPageLayout