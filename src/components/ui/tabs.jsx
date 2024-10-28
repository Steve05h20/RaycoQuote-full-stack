import React from 'react';

export const TabsList = ({ className, children }) => (
  <div className={`flex border-b mb-4 ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 mr-2 focus:outline-none ${
      active
        ? 'border-b-2 border-blue-500 text-blue-500'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeValue, children }) => {
  if (value !== activeValue) return null;
  return <div>{children}</div>;
};

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === TabsList) {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, trigger => {
            if (React.isValidElement(trigger) && trigger.type === TabsTrigger) {
              return React.cloneElement(trigger, {
                active: trigger.props.value === activeTab,
                onClick: () => setActiveTab(trigger.props.value)
              });
            }
            return trigger;
          })
        });
      }
      if (child.type === TabsContent) {
        return React.cloneElement(child, {
          activeValue: activeTab
        });
      }
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
};