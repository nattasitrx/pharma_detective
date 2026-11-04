cd "$(dirname "$0")" && mkdir -p build
cat g1_head.html g2_body.html g3_data.js g3img.js g3c_icons.js g3b_case.js g4_chars.js g5_bg.js g6_tone.js g6a_core.js g6b_vn.js g6c_calc.js g6d_fp.js g6e_sync.js g7a_story.js g7b_story.js g7d_medrev.js g7c_boss.js g7e_editor.js g7f_class.js g7g_teacher.js g7h_memo.js g7i_pillyfight.js g7j_avatar.js g7k_mynotes.js g7l_license.js g7m_history.js g7n_feedback.js g8_pages.js > build/pharma_detective_chen.html
python3 -c "
import re;s=open('build/pharma_detective_chen.html',encoding='utf-8').read();sc=re.findall(r'<script>(.*?)</script>',s,re.S);open('allg.js','w',encoding='utf-8').write('\n;\n'.join(sc));print('scripts',len(sc),'bytes',len(s.encode()))"
node --check allg.js && echo SYNTAX_OK
