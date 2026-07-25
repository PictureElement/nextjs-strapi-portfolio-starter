import SectionHeader from "./SectionHeader";
import ShapeDivider from "./ShapeDivider";
import ServiceEntry from './ServiceEntry';

const data = {
  headline: 'HARDWARE INTEGRATION & TELEMETRY',
  supportiveText: 'Bridging software configuration with physical electronic architecture',
  list: [
    {
      id: 1,
      title: 'High-inertia cinematic platform',
      description:
        'Engineered a robust aerial platform optimized for carrying action-camera payloads while maintaining absolute environmental and structural resilience.\n\n* **Power Architecture:** Precision-soldered the electronics stack, deploying a FETtec Spike Absorber (TVS diodes) and low-ESR capacitors to safely clamp transient voltage spikes from high-draw brushless systems.\n* **Signal & RF Integrity:** Integrated an isolation shield between the 4-in-1 ESC and flight controller to protect the FC\'s sensitive components from electromagnetic interference (EMI).\n* **Structural & Environmental Resilience:** Chamfered and sealed carbon fiber edges with cyanoacrylate (CA) adhesive to prevent delamination. Applied silicone conformal coating, thermoplastic strain relief, and structural threadlocker to survive high-vibration and high-G impacts.',
      tags: ['470g AUW', '4S 1300mAh', '2203.5 3550KV', '3x3x5 props', 'EMI shielded']
    },
    {
      id: 2,
      title: 'Sub-250g dual-profile platform',
      description:
        'Engineered a low-acoustic, sub-250g platform operating under strict spatial constraints, primarily optimized for ultra-quiet efficiency in urban environments.\n\n* **Extreme Integration:** Successfully packaged a Caddx Vista HD System, full-size DJI FPV camera, and TBS Crossfire Nano RX with a full-size Immortal T antenna into a micro-frame.\n* **Precision Rework:** Meticulously rewired salvaged 1404 3700KV motors by soldering new leads directly to the delicate stator windings to avoid wire splices.\n* **Dynamic Telemetry Logic:** Mapped Betaflight Motor Output Limits to a radio switch, enabling real-time toggling between a "Daily Scout" simulated low-KV mode yielding 10–12+ min of quiet cruising (223g), and a full-power "Cinematic Payload" mode providing exact 3700KV RPM overhead to carry a Naked GoPro 6 without washout (250g).',
      tags: ['218g/248g AUW', '4S 750mAh', '1404 3700KV', 'T3x2x3 props', 'Dynamic profiles']
    },
  ],
};

export default function HardwareIntegration() {
  return (
    <section className="bg-neutral-50 py-24 relative">
      <ShapeDivider className="fill-white" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader headline={data.headline} supportiveText={data.supportiveText} />
        <p className="text-gray-700 font-light leading-7 sm:text-xl max-w-3xl mx-auto text-center mb-12">Beyond web architecture, I have engineered custom FPV quadcopters. As an EASA A1/A3 certified pilot registered with the Cyprus Department of Civil Aviation, I use this cross-domain discipline to seamlessly bridge precision hardware integration with software logic.</p>
        {/* <div className="mb-12 w-full rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
          <img src="https://placehold.co/2100x900.jpg" alt="Top-down view of the custom 5-inch cinematic and Sub-250g FPV quadcopters" className="w-full object-cover aspect-video sm:aspect-[21/9]" />
        </div> */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 max-h-full'>
          {data.list.map((entry) => (
            <ServiceEntry
              key={entry.id}
              title={entry.title}
              description={entry.description}
              tags={entry.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
