import { Shield, Zap, Globe, Lock, Cloud, Users } from 'lucide-react';

const FeatureList = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Encrypted',
      description: 'Your documents are protected with bank-level encryption',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Sign documents in seconds, not minutes',
    },
    {
      icon: Globe,
      title: 'Works Anywhere',
      description: 'Access from any device, anywhere in the world',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'We never store your documents longer than necessary',
    },
    {
      icon: Cloud,
      title: 'Cloud Powered',
      description: 'Reliable infrastructure with 99.9% uptime',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share and collaborate with team members easily',
    },
  ];

  return (
    <div className="cosmic-card p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmos-300 to-nebula-300 bg-clip-text text-transparent mb-2">
          Why Choose DocSign Universe?
        </h2>
        <p className="text-muted-foreground">
          Experience the future of document signing with our cosmic platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group p-6 rounded-lg border border-border/50 hover:border-cosmos-400/50 transition-all duration-300 bg-gradient-to-br from-card/50 to-card/30 hover:shadow-lg hover:shadow-cosmos-500/10"
            >
              <div className="p-3 bg-gradient-to-r from-cosmos-500 to-accent rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureList;
export {};