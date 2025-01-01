import { Collapse } from 'antd';

const { Panel } = Collapse;

const Services = () => (
  <div className="py-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
    <div className="container mx-auto">
      <h2 className="text-center text-3xl font-bold mb-8 text-yellow-400">Frequently Asked Questions</h2>
      <Collapse accordion>
        <Panel
          header={<span className="text-yellow-300 font-semibold">What is the return policy?</span>}
          key="1"
        >
          <p className="text-white bg-gradient-to-r from-blue-500 to-blue-700 px-10 py-3 font-medium">We offer a 3-day return policy for all products.</p>
        </Panel>
        <Panel
          header={<span className="text-yellow-300 font-semibold">How long does shipping take?</span>}
          key="2"
        >
          <p className="text-white bg-gradient-to-r from-blue-500 to-blue-700 px-10 py-3 font-medium">Shipping typically takes 3-5 business days.</p>
        </Panel>
        <Panel
          header={<span className="text-yellow-300 font-semibold">Do you offer customer support?</span>}
          key="3"
        >
          <p className="text-white bg-gradient-to-r from-blue-500 to-blue-700 px-10 py-3 font-medium">Yes, we offer 24/7 customer support to assist you.</p>
        </Panel>
      </Collapse>
    </div>
  </div>
);

export default Services;
