import estilos from './Banner.module.scss';

const Banner = () => {
  return (<section className={estilos.BannerArea}>
    <div className={estilos.Container}>
      <h1 className={estilos.Titulo}>DevFood</h1>
      <p><em>Felicidade em cada prato.</em></p>
    </div>
  </section>)
}

export default Banner