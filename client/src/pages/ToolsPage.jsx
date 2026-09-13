import { useState } from 'react';
import { Calculator } from 'lucide-react';

const ToolsPage = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');

  const calculateOhmsLaw = (type) => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    if (type === 'voltage' && i && r) {
      setVoltage((i * r).toFixed(2));
    } else if (type === 'current' && v && r) {
      setCurrent((v / r).toFixed(2));
    } else if (type === 'resistance' && v && i) {
      setResistance((v / i).toFixed(2));
    }
  };

  return (
    <div className="container-custom py-24">
      <h1 className="text-display-mobile lg:text-display-sm font-display mb-8">Hardware Tools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ohm's Law Calculator */}
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-accent-primary" />
            <h2 className="text-2xl font-semibold">Ohm's Law Calculator</h2>
          </div>
          <p className="text-text-secondary mb-6">V = I × R | Calculate voltage, current, or resistance</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Voltage (V)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="input"
                placeholder="Enter voltage in volts"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Current (I)</label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="input"
                placeholder="Enter current in amperes"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Resistance (R)</label>
              <input
                type="number"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="input"
                placeholder="Enter resistance in ohms"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <button onClick={() => calculateOhmsLaw('voltage')} className="btn-pill-accent justify-center text-sm">
                Calculate V
              </button>
              <button onClick={() => calculateOhmsLaw('current')} className="btn-pill-accent justify-center text-sm">
                Calculate I
              </button>
              <button onClick={() => calculateOhmsLaw('resistance')} className="btn-pill-accent justify-center text-sm">
                Calculate R
              </button>
            </div>
          </div>
        </div>

        {/* More calculators can be added here */}
        <div className="card p-8 flex items-center justify-center text-center">
          <div>
            <Calculator className="w-16 h-16 text-accent-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">More Tools Coming Soon</h3>
            <p className="text-text-secondary">Resistor Color Code, LED Calculator, Voltage Divider, and more...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
