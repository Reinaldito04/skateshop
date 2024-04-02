import React, { useRef, useEffect, useState } from 'react';
import "./styles/Items.css";

function Items() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting);
          },
          { threshold: 0.5 }
        );
    
        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }
    
        return () => {
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        };
      }, []);

    useEffect(() => {
        if (isVisible) {
          const timer = setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return () => clearTimeout(timer);
        }
      }, [isVisible]);

    useEffect(() => {
        if (!isLoading) {
          sectionRef.current.style.opacity = 0.9; // Reduce la opacidad cuando se está cargando una nueva imagen
          const timer = setTimeout(() => {
            sectionRef.current.style.opacity = 1; // Restaura la opacidad después de un breve tiempo
          }, 500); // Ajusta el tiempo según sea necesario
          return () => clearTimeout(timer);
        }
      }, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className={`sectionItems ${isLoading ? 'loading' : ''} ${isVisible ? 'visible' : ''}`}
    >
    
    <h2 className='tituloItems'>Diseños Exclusivos </h2>
   <p className='parraf-Items'>Los diseños más exclusivos en la zona metropolitana y sus alrededores</p>
    </section>
  );
}

export default Items;
