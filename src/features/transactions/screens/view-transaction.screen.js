import React, { useState, useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import { useAuth } from "../../../services/hooks/useAuth";
import { Button, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

const TransactionBackground = styled.View`
padding-top: 30px;
background-color: ${(props) => props.theme.colors.primary};
padding-bottom: 40px;
`;

const DetailsContainer = styled.View`
text-align: left;
margin-left: 12px;
`;

const DetailsCard = styled.View`
padding: 12px;
border-bottom: 3px black;
`;

const Title = styled.Text`
font-size: 22px;
text-align: center;
padding: 12px;
`;

const Label = styled.Text`
font-size: 20px;
text-align: left;
font-weight: bold;
color: gainsboro;
`;

const Paragraph = styled.Text`
font-size: 22px;
text-align: left;
color: white;
`;

const ReportButton = styled(Button).attrs({
  fontSize: 27,
})`
width: 270px;
padding: 13px;
color: white;
background-color: red;
color: 'white';
margin: auto;
margin-top: 60px;
margin-bottom: 30px
`;

const LoadingContainer = styled.View`
margin: auto;
`;

export const ViewTransactionDetailScreen = ({ route }) => {
   const { user } = useAuth()
   const { details } = route.params;

   const [loading, setLoading] = useState(false)


   useEffect(() => {
      
   }, [])

  return (
     <TransactionBackground>
         <ScrollView endFillColor={"green"} contentContainerStyle={{  backgroundColor: '#1A1A1A'}}>
      {loading && <ActivityIndicator animating={true} color="#52ab98" size={32} />}      
          <DetailsContainer>
          {details && details.method === "deposit" && (    
        <>
       <DetailsCard>
       <Label>Type</Label>
       <Paragraph>Deposit</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Gateway:</Label>
       <Paragraph>{details.gateway}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Amount:</Label>
       <Paragraph>₦{details.amount}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Status:</Label>
       <Paragraph>{details.status}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Date:</Label>
       <Paragraph>{details.date.toDate().toDateString()}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Reference</Label>
       <Paragraph>{details.id}</Paragraph>
       </DetailsCard>
       </> 
       )}
          {details && details.method === "ref_commission" && (    
        <>
       <DetailsCard>
       <Label>Type</Label>
       <Paragraph>Refferal Commission</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Amount:</Label>
       <Paragraph>₦{details.amount}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Status:</Label>
       <Paragraph>{details.status}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Date:</Label>
       <Paragraph>{details.date.toDate().toDateString()}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Reference</Label>
       <Paragraph>{details.id}</Paragraph>
       </DetailsCard>
       </> 
       )}
       {details && details.method === "ad_view" && (    
        <>
       <DetailsCard>
       <Label>Type</Label>
       <Paragraph>Ad View</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Amount:</Label>
       <Paragraph>₦{details.amount}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Status:</Label>
       <Paragraph>{details.status}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Date:</Label>
       <Paragraph>{details.date.toDate().toDateString()}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Reference</Label>
       <Paragraph>{details.id}</Paragraph>
       </DetailsCard>
       </> 
       )}
         {details && details.method === "plan_subscription" && (    
        <>
       <DetailsCard>
       <Label>Type</Label>
       <Paragraph>Plan Subscription</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Amount:</Label>
       <Paragraph>₦{details.amount}</Paragraph>
       </DetailsCard>
       <DetailsCard>
        <Label>Status:</Label>
       <Paragraph>{details.status}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Date:</Label>
       <Paragraph>{details.date.toDate().toDateString()}</Paragraph>
       </DetailsCard>
        <DetailsCard>
        <Label>Reference</Label>
       <Paragraph>{details.id}</Paragraph>
       </DetailsCard>
       </> 
       )}
      </DetailsContainer>
 
     
      {details && <ReportButton mode="contained">Report Transaction!</ReportButton>}
      </ScrollView>
     </TransactionBackground>
  )
}