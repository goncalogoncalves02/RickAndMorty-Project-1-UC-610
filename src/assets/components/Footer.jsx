const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Rick and Morty Wiki. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
