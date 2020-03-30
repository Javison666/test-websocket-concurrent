const uuid = {
    expired:[],
    randomString(len) {
        len = len || 32;
        let $chars = 'abcdef0123456789';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
        　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    make(){
        return uuid.randomString(4)+"-"+uuid.randomString(4)+"-"+uuid.randomString(4)
    },
    create(){
        const str = uuid.make()
        if(uuid.expired.indexOf(str)>-1){
            return uuid.create()
        }
        uuid.expired.push(str)
        return str
    }
}
export default uuid