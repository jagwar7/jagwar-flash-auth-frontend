import * as React from 'react';
import { ReactNode } from "react";



export function AlertStateProvider({children}:{children: ReactNode}){

  const [activeAlert, setActiveAlert] = useState(false);
  const [alertData, setAlertData] = useState('');
  const [isPositive, setIsPositive] = useState(false);

  return <AlertStateProvider.

}