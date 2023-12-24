import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IGlobalState } from "../../store/reducers/reducers.tsx";
import React from "react";
import "../../assets/css/ScoreCard.css"

const ScoreCard = () => {
    const score = useSelector((state: IGlobalState) => state.score);
    return (
        <div className="ScoreCard">
            <Heading as="h2" size="md" mt={5} mb={5}>Current Score: {score/2}</Heading>
        </div>
    );
}

export default ScoreCard;