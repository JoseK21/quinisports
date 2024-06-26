import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="bg-slate-50 py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Ofrecemos"
            paragraph="En QUINISPORTS, no solo nos esforzamos por brindarte emocionantes experiencias deportivas, sino también por ofrecerte una amplia gama de beneficios y características que hacen que tu participación sea aún más gratificante."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
