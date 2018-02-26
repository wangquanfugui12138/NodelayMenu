/**
 * Created by admin on 2018/2/26.
 */
function sameSign(a,b){
    return a ^ b >= 0
}
function vector(a,b){
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}
function vectorPro(v1,v2){
    return v1.x * v2.y - v1.y * v2.x
}
function isPortIn(p,a,b,c){
    var pa=vector(p,a);
    var pb=vector(p,b);
    var pc=vector(p,c);

    var t1=vector(pa,pb);
    var t2=vector(pb,pc);
    var t3=vector(pc,pa);

    return sameSign(t1,t2) &&sameSign(t2,t3)
}
function isNeed(ele,pre,cur){
    var offset=ele.offset();

    var top={
        y:offset.top,
        x:offset.left
    }
    var bottom={
        y:offset.top+ele.height(),
        x:offset.left
    }

    return isPortIn(cur,pre,top,bottom);
}