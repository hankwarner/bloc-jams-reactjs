import styled from "styled-components";

export default styled.div`
    width: 150px;
    border: 5px white;
    padding: 10px;
    float: right;
    margin-left: ${props => (props.low ? '100px' : (props.input ? '200px' : '300px')) };
`;