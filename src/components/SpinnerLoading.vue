<template>
    <div class="container">
        <span class="loader"></span>
    </div>
</template>

<style lang="scss" scoped>
.container{
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;


    .loader {
    width: 48px;
    height: 48px;
    border: 5px solid var(--green);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>